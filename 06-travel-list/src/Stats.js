/** @format */
export default function Stats({ items }) {
  if (!items || !Array.isArray(items) || items.length === 0) {
    return (
      <p className="stats">
        <em>Start adding some items in the List 💪</em>
      </p>
    );
  }
  const numItems = items.length;
  const numPakedItems = items.filter((item) => item.packed === true).length;
  const percentage = Math.round((numPakedItems / numItems) * 100);
  console.log(percentage);
  return (
    <footer className="stats">
      <em>
        {percentage !== 100
          ? `💼 You have ${numItems} items on your List, And you have packed
        ${numPakedItems} (${percentage}%)`
          : "You are Ready to go ✈️"}
      </em>
    </footer>
  );
}
