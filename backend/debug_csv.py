from services.csv_service import load_sales_data

df = load_sales_data()

print(df.columns.tolist())
print(df.head())