interface TitleProps {
  title: string
}

export const Title = ({ title }: TitleProps) => {
  return <h2 className="text-xl sm:text-2xl md:text-3xl text-gray-700 mb-4 md:mb-6">{title}</h2>
}
