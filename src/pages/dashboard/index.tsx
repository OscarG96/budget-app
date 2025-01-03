import Card from "@/components/card"

export default function Dashboard() {
    return (
        <div className="flex w-full flex-col max-w-4xl mx-auto px-4 sm:px-4 lg:px-6">
            <Card title="Spent" value={3}></Card>
            <Card title="Saved" value={4}></Card>
        </div>
    )
}