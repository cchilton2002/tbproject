import json
import matplotlib.pyplot as plt
from collections import Counter
import requests


# Loads the data from the given url
def load_data(url):
    response = requests.get(url)
    response.raise_for_status()
    return response.json()


# Generates a pie chart from the given data
def generate_pie_chart(data, output_path):
    clothes = [item['clothe'] for item in data.get('payload', [])]
    clothing_counter = Counter(clothes)
    labels = list(clothing_counter.keys())
    sizes = list(clothing_counter.values())
    
    labels = [label.capitalize() for label in labels]
    
    plt.figure(figsize=(6,6))
    plt.pie(sizes, labels=labels, autopct='%1.0f%%',textprops={'fontsize':20})
    plt.title("Distribution of Clothes Worn", fontsize=25)

    plt.savefig(output_path, transparent=True)
    plt.close()

    

if __name__ == '__main__':
    
    json_url = r'https://tboxapps.therapy-box.co.uk/hackathon/clothing-api.php?username=swapnil'
    output_image = r'../assets/clothes_pie.png'
    
    # Runs the code and generates a pie chart which it outputs into a file
    try:
        data = load_data(json_url)
        generate_pie_chart(data, output_image)
    except Exception as e:
        print(f"An error has ocurred: {e}")

