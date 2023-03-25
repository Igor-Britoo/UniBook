import { Card,
RowOrderStatus,
Text,
RowBook,
Author,
Price, } from "../styles/CardOrder";



export const CardOrder = ({ orders }) => {
    
    function getOrderStatus(statusAcronym) {
        switch (statusAcronym) {
            case 'P':
                return 'Pending';
            case 'OC':
                return 'Order confirmed';
            case 'PA':
                return 'Payment approved';
            case 'S':
                return 'Shipped';
            case 'T':
                return 'In transit';
            case 'D':
                return 'Delivered';
            case 'C':
                return 'Cancelled';
            default:
                return ''
        }
      }
    
    return(
        <>
        { orders.map((order, index) => 
            <Card key={index}>

                <Text>Code: { order.code }</Text>
                <Text>Status: { getOrderStatus(order.status) }</Text>
                {/* <Text>Shipping Address: { order.shipping_address }</Text> */}
                
                <RowBook>
                    <img src="images/book.png" alt="book" className="img"></img>
                    <div>
                        <Text>What I Learned from the Trees</Text>
                        <Author>L.E. Bowman</Author>
                        <Price>$ { order.price }</Price>
                    </div>
                </RowBook>
            </Card>
        )}
        </>
    );
}