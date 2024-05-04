import forbiddenImage from "../assets/images/403-Error.png"

export default function Forbidden() {
  return (
    <div>
        <img src={forbiddenImage}
         alt="forbidden error image"
         className="w-96 max-w-100 m-auto" />
    </div>
  )
}
