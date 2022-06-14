
export const formatRupiah = (money) => {
    return new Intl.NumberFormat('id-ID',
      { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }
    ).format(money);
 }

export function subTotal(value) {
    return value.reduce((acc, curr) => acc + curr.price * curr.qty,0);
}


export function getTotal(value) {
    return value.qty * value.price
 }
 