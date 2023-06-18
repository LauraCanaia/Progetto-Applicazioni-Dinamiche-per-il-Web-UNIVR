export interface PAYMENT {
  amount: string;
  payment_date: string;
  rental_date: string;
  return_date:string;
  duration:string;
  title:string;

}

export function getDuration(milli: any){
  let minutes = Math.floor(milli / 60000);
  let hours = Math.round(minutes / 60);
  let days = Math.round(hours / 24);
  return days + (" days")
};

export function toISODate(timemillis: string) {
  var date = parseInt(timemillis);
  var d = new Date(date);
  var ds = d.toISOString().split('T')[0];
  return ds
}
