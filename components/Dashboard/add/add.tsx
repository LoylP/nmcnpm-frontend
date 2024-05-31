interface AddItem {
    content: string | number
}

const Add = (props: AddItem) => {
  return (
    <div className="flex mt-2 justify-center  item-center gap-5">
        {props.content}
    </div>
  );
};

export default Add;
