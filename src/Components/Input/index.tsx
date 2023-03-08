import { FaExclamationCircle } from "react-icons/fa";

type Props = {
  type: string;
  placeholder?: string;
  field?: string;
  register?: any;
  message?: any;
};

const Input = ({ type, placeholder, field, register, message }: Props) => {
  return (
    <div className="w-full pb-8 relative">
      <input
        className="border border-gray-400 outline-none rounded-lg w-full px-5 py-3"
        style={{
          borderColor: message ? "rgb(220 38 38)" : "rgb(229, 231, 235)",
          backgroundColor: message ? "rgb(254 202 202)" : "transparent",
        }}
        type={type}
        placeholder={message || placeholder}
        {...register(field)}
      />

      {message ? (
        <p
          className="absolute top-1/4 right-3"
          style={{
            color: message ? "rgb(220 38 38)" : "rgb(229, 231, 235)",
          }}
        >
          <FaExclamationCircle />
        </p>
      ) : (
        "   "
      )}
    </div>
  );
};

export default Input;
