import json

mv1_original = "mv1.json"
mv1_rewrite = "mv1-rewrite.json"

mv1_original_data = json.load(open(mv1_original, "r", encoding="utf-8"))

# find all guard performers in mv1_rewrite
with open(mv1_rewrite, "r", encoding="utf-8") as f:
    data = json.load(f)
    for label, performer in data.items():
        if label.startswith("G"):
            mv1_original_data[label] = performer

json.dump(
    mv1_original_data,
    open("mv1-guard-replace.json", "w", encoding="utf-8"),
    indent=4,
    ensure_ascii=False,
)
