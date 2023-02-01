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
        className="border border-gray-400 rounded-lg w-full px-5 py-3"
        style={{
          borderColor: message ? "rgb(220 38 38)" : "rgb(229, 231, 235)",
        }}
        type={type}
        placeholder={placeholder}
        {...register(field)}
      />
      <p className="absolute bottom-2 left-1 text-sm text-red-600">{message}</p>
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
