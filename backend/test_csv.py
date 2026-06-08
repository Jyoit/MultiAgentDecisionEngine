# test_csv.py

from services.csv_service import load_sales_data

df = load_sales_data()

print(df.head())

