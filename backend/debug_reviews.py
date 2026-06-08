from services.csv_service import load_reviews

df = load_reviews()

print(df.columns.tolist())
print(df.head())
