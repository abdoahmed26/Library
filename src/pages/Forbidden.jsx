import forbiddenImage from "../assets/images/403-Error.png"

export default function Forbidden() {
  return (
    <div>
        <img src={forbiddenImage}
          alt="forbidden error image"
          className="m-auto w-96 max-w-100" />
    </div>
  )
}
