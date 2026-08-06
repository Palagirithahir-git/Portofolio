export function trackEvent(
  event:string
){

  if(typeof window === "undefined"){
    return;
  }


  const oldData =
    JSON.parse(
      localStorage.getItem("analytics") || "{}"
    );


  const updated = {

    ...oldData,

    [event]:
    (oldData[event] || 0) + 1,

  };


  localStorage.setItem(
    "analytics",
    JSON.stringify(updated)
  );

}