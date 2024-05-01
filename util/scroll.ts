export const scrollToBottom = (containerRef: any) => {
  // Access the last child of the containerRef
  const lastChild = containerRef.current.lastElementChild;
  lastChild.scrollIntoView({
    behavior: "smooth",
    block: "end",
  });
};
// containerRef.current.addEventListener("scroll", handleUserScroll);

export const handleuserScroll = () => {
  console.log("user scrolling..");
};
