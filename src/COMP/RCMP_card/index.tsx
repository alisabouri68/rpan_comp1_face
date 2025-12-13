function Index(props: any) {
  const { cards } = props;
  return (
    <div className=" grid grid-cols-4 items-center justify-between gap-4">
      {(cards ?? []).map((card: any) => {
        return (
          <div
            className={`flex items-center justify-center border ${card?.backgroundColor} rounded-lg py-4 gap-1`}
          >
            <div className=" bg-white rounded-full w-16 h-16 flex items-center justify-center">
              <card.icon
                size={35}
                className="text-gray-800"
                color="currentColor"
              />
            </div>
            <div className=" space-y-2 flex flex-col items-start">
              <div>{card?.title}</div>
              <div className="flex gap-1 items-center justify-center">
                <span className="text-lg font-bold">{card?.value}</span>
                <span>({card?.subtitle})</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Index;
