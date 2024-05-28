import app from "./app"

const PORT: string|number = process.env.PORT || 8081;

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
})