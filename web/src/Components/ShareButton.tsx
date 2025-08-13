export default function ShareButton(){
  async function copy(){
    await navigator.clipboard.writeText(window.location.href);
    alert("Link copied!");
  }
  return <button className="btn" onClick={copy}>Share</button>;
}
