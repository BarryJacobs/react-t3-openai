interface LoaderProps {
  active: boolean
}

export const Loader = ({ active }: LoaderProps) => (
  <div className={`relative inline-block h-10 w-10 ${!active ? "hidden" : ""}`}>
    <div className="absolute top-0 left-0 rounded-full h-10 w-10 bg-loader-1 opacity-50 animate-loading" />
    <div className="absolute top-0 left-0 rounded-full h-10 w-10 bg-loader-2 opacity-50 animate-loading animation-delay-1000" />
    <div className="absolute top-0 left-0 rounded-full h-10 w-10 bg-loader-2 bg-opacity-50 opacity-50 animate-loading animation-delay-2000" />
  </div>
)
