// Inupt: Something that looks like [0,1,1,0,0] for a blue/black card
// Output: Something that looks like ["U","B"]
export default function colorArraryNumbertoString(array) {
  const colors = ["W", "U", "B", "R", "G"];
  const res = [];
  array.forEach((element, index) => {
    if (element === 1) {
      res.push(colors[index]);
    }
  });
  return res;
}