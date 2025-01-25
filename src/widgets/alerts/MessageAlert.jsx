import { ExclamationTriangleIcon } from "@heroicons/react/24/outline"
import { Alert } from "@material-tailwind/react"

export function MessageAlert({ alertData, showAlert }) {
    return (
        <div>
            {showAlert && (
                <div className="fixed bottom-4 right-4 z-50">
                    <Alert
                        color={alertData.type === "success" ? "green" : "red"}
                        className="max-w-screen-md"
                        icon={
                            alertData.type === "success" ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="h-6 w-6"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            ) : (
                                <ExclamationTriangleIcon className="h-6 w-6" />
                            )
                        }
                    >
                        {alertData.message}
                    </Alert>
                </div>
            )}
        </div>
    )
}

export default MessageAlert
