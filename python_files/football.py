import pandas as pd
import json
from collections import defaultdict


# Create a function to generate a dictionary of teams and the teams they have beaten
# Output this as a JSON file which we can read in the frontend
def process_data():
    file_path = "I1.csv"
    df = pd.read_csv(file_path)
    
    team_wins = defaultdict(list)

    for _, row in df.iterrows():
        home_team = row["HomeTeam"]
        away_team = row["AwayTeam"]
        result = row["FTR"]

        if result == "H":  # Home win
            team_wins[home_team].append(away_team)
        elif result == "A":  # Away win
            team_wins[away_team].append(home_team)

    with open("../../public/data/team_wins.json", "w") as json_file:
        json.dump(team_wins, json_file)

# Call the function to generate the JSON file
process_data()