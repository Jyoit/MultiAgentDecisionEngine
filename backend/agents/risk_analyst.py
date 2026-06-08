from services.csv_service import load_sales_data
from services.csv_service import load_products


def risk_analyst(state):

    sales_df = load_sales_data()

    products_df = load_products()

    avg_quantity = sales_df["quantity"].mean()
    
    avg_revenue = sales_df["revenue"].mean()

    if avg_quantity >= 15:
        risk_score = 35
    elif avg_quantity >= 10:
        risk_score = 55
    else:
        risk_score = 80

    risk_factors = []

    if avg_quantity < 10:
        risk_factors.append(
        "Low sales quantity"
    )

    if avg_revenue < 5000:
        risk_factors.append(
            "Revenue pressure"
        )

    mitigation_steps = [
        "Limit discount scope",
        "Monitor margins",
        "Track competitor pricing"
    ]

    return {
        "risk_data": {
            "risk_score": risk_score,
            "risk_factors": risk_factors,
            "mitigation_steps": mitigation_steps
        }
    }