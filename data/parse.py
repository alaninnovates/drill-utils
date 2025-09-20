import csv
import json

file = 'mv1-raw.csv'
output = 'mv1.json'

data = []
with open(file, 'r', encoding='utf-8') as f:
    reader = csv.reader(f)
    performers_raw = {}
    current_perf_name = None
    current_perf_data = []
    for row in reader:
        if row[0].startswith('Performer: '):
            if current_perf_name:
                performers_raw[current_perf_name] = current_perf_data
            current_perf_data = []
            current_perf_name = row[2].replace('Label: ', '').strip()
        current_perf_data.append(row)
    
    performers = {}
    for name, rows in performers_raw.items():
        performer = {
            'performer': rows[0][0].replace('Performer:', '').strip(),
            'id': rows[0][3].replace('ID:', '').strip(),
            'symbol': rows[0][1].replace('Symbol:', '').strip(),
            'label': rows[0][2].replace('Label:', '').strip(),
            'dots': []
        }
        for dot in rows[1:]:
            sideToSide = dot[2].replace('S1: ', '').replace('S2: ', '').strip()
            frontToBack = dot[3].strip()

            sts_parts = sideToSide.split(' ')
            if len(sts_parts) >= 4:
                yardline = None
                stepOffset = None
                stepOffsetDirection = None
                if 'On' in sts_parts:
                    yardline = int(sts_parts[1])
                    stepOffset = 0
                    stepOffsetDirection = 'Outside'
                else:
                    stepOffset = float(sts_parts[0])
                    stepOffsetDirection = sts_parts[2].title()
                    yardline = int(sts_parts[3])
                
                side_to_side_parsed = {
                    'yardline': yardline,
                    'stepOffset': stepOffset,
                    'stepOffsetDirection': stepOffsetDirection
                }
            else:
                side_to_side_parsed = None

            ftb_parts = frontToBack.split(' ')
            if len(ftb_parts) >= 5:
                line = None
                ftb_line = ' '.join(ftb_parts[-4:])
                if ftb_line == 'Front Hash Hash (HS)':
                    line = 'Front Hash (HS)'
                elif ftb_line == 'Back Hash Hash (HS)':
                    line = 'Back Hash (HS)'
                elif ftb_line == 'Front Hash side line':
                    line = 'Front Side Line'
                elif ftb_line == 'Back Hash side line':
                    line = 'Back Side Line'
                stepOffset = None
                stepOffsetDirection = None
                if 'On' in ftb_parts:
                    stepOffset = 0
                    stepOffsetDirection = 'Behind'
                else:
                    stepOffset = float(ftb_parts[0])
                    stepOffsetDirection = 'Behind' if ftb_parts[2] == 'behind' else 'In Front Of'
                front_to_back_parsed = {
                    'line': line,
                    'stepOffset': stepOffset,
                    'stepOffsetDirection': stepOffsetDirection
                }
            else:
                front_to_back_parsed = None

            dot_parsed = {
                'set': dot[0],
                'counts': int(dot[1]),
                'side': 1 if dot[2].startswith('S1') else 2,
                'sideToSide': side_to_side_parsed,
                'frontToBack': front_to_back_parsed
            }
            performer['dots'].append(dot_parsed)
        performer['dots'].sort(key=lambda x: (int(''.join(filter(str.isdigit, x['set']))), ''.join(filter(str.isalpha, x['set']))))
        performers[name] = performer

    with open(output, 'w', encoding='utf-8') as f:
        json.dump(performers, f, indent=4)