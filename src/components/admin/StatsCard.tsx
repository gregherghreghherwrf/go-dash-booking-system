type Props = {
  title: string;
  value: string;
};

export default function StatsCard({
  title,
  value,
}: Props) {
  return (
    <div className="bg-zinc-900 rounded-xl p-6">

      <h3 className="text-gray-400">
        {title}
      </h3>

      <p className="text-4xl font-bold mt-3">
        {value}
      </p>

    </div>
  );
}