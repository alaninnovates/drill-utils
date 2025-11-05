import csv
import json

file = "mv2-rewrite-raw.csv"
output = "mv2-rewrite.json"

data = []
with open(file, "r", encoding="utf-8") as f:
    reader = csv.reader(f)
    performers_raw = {}
    current_perf_name = None
    current_perf_data = []
    for row in reader:
        if row[0].startswith("Performer: "):
            if current_perf_name:
                performers_raw[current_perf_name] = current_perf_data
            current_perf_data = []
            current_perf_name = row[1].replace("Label: ", "").strip()
        current_perf_data.append(row)

    performers_raw[current_perf_name] = current_perf_data

    # print(performers_raw)

    performers = {}
    for name, rows in performers_raw.items():
        performer = {
            "performer": rows[0][0]
            .replace("Performer:", "")
            .split(":")[0]
            .replace("Symbol", "")
            .strip(),
            "id": rows[0][2].replace("ID:", "").strip(),
            "symbol": rows[0][0]
            .replace("Performer:", "")
            .split(":")[1]
            .replace("Symbol", "")
            .strip(),
            "label": rows[0][1].replace("Label:", "").strip(),
            "dots": [],
        }
        for dot in rows[2:]:
            # ['1 0 Side 2: 2.5 steps outside 50 yd ln', '', '', '10.5 steps in front of Back Hash (HS)'],
            spl = " ".join(dot[0].split(" ")[2:])
            s = dot[0].split(" ")[0].strip()

            sideToSide = (
                spl.replace("S1: ", "").replace("S2: ", "").strip()
            )  # "1.5 steps inside 35 yd ln" or "On 50 yd ln"
            frontToBack = dot[3].strip()  # "12.0 steps behind Front Hash (HS"

            print(f"[{performer["label"]}] => s{s} [{sideToSide}] / [{frontToBack}]")

            sts_parts = sideToSide.split(" ")
            if len(sts_parts) >= 4:
                yardline = None
                stepOffset = None
                stepOffsetDirection = None
                if "On" in sts_parts:
                    yardline = int(sts_parts[1])
                    stepOffset = 0
                    stepOffsetDirection = "Outside"
                else:
                    stepOffset = float(sts_parts[0])
                    stepOffsetDirection = sts_parts[2].title()
                    yardline = int(sts_parts[3])

                side_to_side_parsed = {
                    "yardline": yardline,
                    "stepOffset": stepOffset,
                    "stepOffsetDirection": stepOffsetDirection,
                }
            else:
                side_to_side_parsed = None

            ftb_parts = frontToBack.split(" ")
            if True:
                line = None
                ftb_line = " ".join(ftb_parts[-4:])
                if "Back Hash (HS)" in ftb_line:
                    line = "Back Hash (HS)"
                elif "Front Hash (HS)" in ftb_line:
                    line = "Front Hash (HS)"
                elif "Front side line" in ftb_line:
                    line = "Front Side Line"
                elif "Back side line" in ftb_line:
                    line = "Back Side Line"
                stepOffset = None
                stepOffsetDirection = None
                if "On" in ftb_parts:
                    stepOffset = 0
                    stepOffsetDirection = "Behind"
                else:
                    stepOffset = float(ftb_parts[0])
                    stepOffsetDirection = (
                        "Behind" if ftb_parts[2] == "behind" else "In Front Of"
                    )
                front_to_back_parsed = {
                    "line": line,
                    "stepOffset": stepOffset,
                    "stepOffsetDirection": stepOffsetDirection,
                }
            else:
                front_to_back_parsed = None

            dot_parsed = {
                "set": dot[0].split(" ")[0].strip(),
                "counts": int(dot[0].split(" ")[1].strip()),
                "side": 1 if "S1" in dot[0] else 2,
                "sideToSide": side_to_side_parsed,
                "frontToBack": front_to_back_parsed,
            }
            print(f"[{performer['label']}] => s{s} => {dot_parsed}")
            performer["dots"].append(dot_parsed)
        # performer["dots"].sort(
        #     key=lambda x: (
        #         int("".join(filter(str.isdigit, x["set"]))),
        #         "".join(filter(str.isalpha, x["set"])),
        #     )
        # )
        performers[name] = performer

    with open(output, "w", encoding="utf-8") as f:
        json.dump(performers, f, indent=4)
