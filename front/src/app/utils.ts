export interface PAYMENT {
  id: Number,
  amount: string;
  payment_date: string;
  duration:string;
  title:string;

}

export interface RENTAL {
  rental_id: Number,
  rental_date: string;
  inventory: string;
  return_date:string;
  payment: PAYMENT;
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
