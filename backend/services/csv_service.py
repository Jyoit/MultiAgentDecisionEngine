from pathlib import Path
import pandas as pd

BASE_DIR = Path(__file__).resolve().parent.parent.parent

DATA_DIR = BASE_DIR / "data"


def load_sales_data():
    return pd.read_csv(DATA_DIR / "sales_history.csv")


def load_products():
    return pd.read_csv(DATA_DIR / "products.csv")


def load_reviews():
    return pd.read_csv(DATA_DIR / "customer_reviews.csv")