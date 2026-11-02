from fastapi import FastAPI

app = FastAPI(
    title="FoodWise AI Service",
    description="AI Food Recommendation Service",
    version="1.0.0"
)


@app.get("/health")
def health():
    return {
        "success": True,
        "message": "FoodWise AI Service is running!"
    }