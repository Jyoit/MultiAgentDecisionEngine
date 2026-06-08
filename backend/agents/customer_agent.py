# from services.csv_service import load_reviews

# from services.sentiment_service import get_sentiment


# def customer_agent(state):

#     reviews_df = load_reviews()

#     sentiments = []

#     for review in reviews_df["review"]:

#         score = get_sentiment(review)

#         sentiments.append(score)

#     avg_sentiment = sum(sentiments) / len(sentiments)

#     if avg_sentiment > 0.3:

#         buying_behavior = [
#             "Discount receptive",
#             "Positive engagement"
#         ]

#     else:

#         buying_behavior = [
#             "Cautious buyers"
#         ]

#     return {
#         "customer_data": {
#             "sentiment_score": round(
#                 avg_sentiment,
#                 2
#             ),
#             "pain_points": [
#                 "Late delivery",
#                 "Packaging issues"
#             ],
#             "buying_behavior": buying_behavior
#         }
#     }














from services.csv_service import load_reviews
from services.sentiment_service import get_sentiment


def customer_agent(state):

    reviews_df = load_reviews()

    sentiments = []

    for review in reviews_df["review_text"]:

        score = get_sentiment(str(review))

        sentiments.append(score)

    avg_sentiment = sum(sentiments) / len(sentiments)

    # avg_rating = reviews_df["rating"].mean()
    avg_rating = float(reviews_df["rating"].mean())

    pain_points = []

    if avg_rating < 3.5:
        pain_points.append("Customer satisfaction concerns")

    if avg_sentiment < 0:
        pain_points.append("Negative sentiment detected")

    buying_behavior = []

    if avg_rating >= 4:
        buying_behavior.append("High customer satisfaction")
        buying_behavior.append("Likely repeat purchases")
    else:
        buying_behavior.append("Moderate customer confidence")

    return {
        "customer_data": {
            "sentiment_score": round(avg_sentiment, 2),
            "average_rating": round(avg_rating, 2),
            "pain_points": pain_points,
            "buying_behavior": buying_behavior
        }
    }