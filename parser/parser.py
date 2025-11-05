import pdfplumber
import collections

pdf = pdfplumber.open("data/HexedMv2.pdf")
all_data = []
for page in pdf.pages:
    lines = page.lines
    rectangle_boxes = []  # in the format: {top_left: (x,y), bottom_right: (x,y)}

    horizontal = collections.defaultdict(list)  # y -> list of (x_start, x_end)
    vertical = collections.defaultdict(list)  # x -> list of (y_start, y_end)

    for line in lines:
        x0, y0 = line["pts"][0]
        x1, y1 = line["pts"][1]
        if abs(x0 - x1) < 1e-6:  # vertical line
            vertical[x0].append((min(y0, y1), max(y0, y1)))
        elif abs(y0 - y1) < 1e-6:  # horizontal line
            horizontal[y0].append((min(x0, x1), max(x0, x1)))

    x_coords = sorted(vertical.keys())
    y_coords = sorted(horizontal.keys())

    TOL = 1.0
    for i in range(len(x_coords) - 1):
        for j in range(i + 1, len(x_coords)):
            x1 = x_coords[i]
            x2 = x_coords[j]
            for k in range(len(y_coords) - 1):
                for l in range(k + 1, len(y_coords)):
                    y1 = y_coords[k]
                    y2 = y_coords[l]
                    # Check if horizontal lines exist at y1 and y2 spanning from x1 to x2 (with tolerance)
                    has_top = any(
                        start - TOL <= x1 and end + TOL >= x2
                        for start, end in horizontal[y1]
                    )
                    has_bottom = any(
                        start - TOL <= x1 and end + TOL >= x2
                        for start, end in horizontal[y2]
                    )
                    # Check if vertical lines exist at x1 and x2 spanning from y1 to y2 (with tolerance)
                    has_left = any(
                        start - TOL <= y1 and end + TOL >= y2
                        for start, end in vertical[x1]
                    )
                    has_right = any(
                        start - TOL <= y1 and end + TOL >= y2
                        for start, end in vertical[x2]
                    )
                    if has_top and has_bottom and has_left and has_right:
                        rectangle_boxes.append(
                            {"top_left": (x1, y1), "bottom_right": (x2, y2)}
                        )

    # print(rectangle_boxes)

    for box in rectangle_boxes:
        cropped = pdf.pages[1].crop(
            (
                box["top_left"][0],
                box["top_left"][1],
                box["bottom_right"][0],
                box["bottom_right"][1],
            )
        )
        # im1 = cropped.to_image(resolution=150)
        # im1.draw_lines([cropped.lines[0]], stroke="blue", stroke_width=1)
        # im1.show()
        # METADATA
        text = cropped.extract_text_lines()[0]["text"]
        performer = text.split("Performer:")[1].split("Symbol:")[0].strip()
        symbol = text.split("Symbol:")[1].split("Label:")[0].strip()
        label = text.split("Label:")[1].split("ID:")[0].strip()
        id = text.split("ID:")[1].split(" ")[0].strip()
        show_name = " ".join(text.split("ID:")[1].split(" ")[1:]).strip()
        # print(performer, symbol, label, id, show_name)

        # find rectangles, sorted by area
        rect = sorted(
            cropped.rects,
            key=lambda r: (r["x1"] - r["x0"]) * (r["y1"] - r["y0"]),
            reverse=True,
        )[2]
        cropped_2 = cropped.crop(
            (
                rect["pts"][0][0],
                rect["pts"][0][1],
                rect["pts"][2][0],
                rect["pts"][2][1],
            )
        )
        im = cropped_2.to_image(resolution=150)
        ### H LINES
        hlines = []
        for r in cropped_2.rects[3:]:
            pts = r["pts"]
            hlines.append(pts[0][1])
            hlines.append(pts[2][1])
        hlines = list(set(hlines))
        hlines.sort()
        avg_dist = sum(hlines[i + 1] - hlines[i] for i in range(len(hlines) - 1)) / (
            len(hlines) - 1
        )
        hlines.append(hlines[-1] + avg_dist)
        hlines.append(hlines[0] - avg_dist)
        hlines.append(hlines[0] - avg_dist * 2)
        # im.draw_hlines(hlines, stroke="red", stroke_width=1)
        ### V LINES
        vlines = []
        for char in cropped_2.extract_words():
            if char["text"] in ["Set", "CountsS1-S2", "Front-Back"]:
                vlines.append(char["x0"])
        vlines.append(vlines[-1] + 120)
        vlines.append(vlines[1] + 20)
        # im.draw_vlines(vlines, stroke="blue", stroke_width=1)
        table = cropped_2.find_table(
            {
                "vertical_strategy": "explicit",
                "horizontal_strategy": "explicit",
                "explicit_horizontal_lines": hlines,
                "explicit_vertical_lines": vlines,
            }
        ).extract()
        # im.show()
        all_data.append(
            {
                "performer": performer,
                "symbol": symbol,
                "label": label,
                "id": id,
                "show_name": show_name,
                "dots": table,
            }
        )

with open("output/parser_output.json", "w") as f:
    import json

    json.dump(all_data, f, indent=4)
