import { Table, Card } from "react-bootstrap"
import { useSelector } from "react-redux";
const UserProfile = () => {
    const user = useSelector(state => state.auth.user)
    return (
        <Card>
            <Card.Header><h4>Profile </h4> </Card.Header>
        <Table>
           <thead>
            <tr>
                <th>Customer ID</th>  
                <th>Fullname</th>
                <th>email</th>
                <th>role</th>  
            </tr>
           </thead>
           <tbody>
            <tr>
                <td>#{user.customer_id}</td>
                <td>{user.full_name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
            </tr>
           </tbody>
        </Table>
        </Card>
    )
}

export default UserProfile;