import Card from "../../components/card"

export default function Dashboard() {
    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card title="Spent" value={3}></Card>
            <Card title="Saved" value={4}></Card>
        </div>
    )
}