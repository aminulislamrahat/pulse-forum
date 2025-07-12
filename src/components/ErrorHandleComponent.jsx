export default function ErrorHandleComponent({ message, textColor }) {
    return (
        <div className="flex items-center justify-center min-h-[calc(100dvh-350px)]">
            <p className={`text-center ${textColor} text-xl font-semibold`}>{message}</p>
        </div>
    );
}