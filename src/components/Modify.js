import React, {useState} from 'react';
import Form from "react-validation/build/form";

function Modify() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");

    // async handleModify(e) {
    //     e.preventDefault();

    //     this.setState({
    //         message: "",
    //         successful: false
    //     });

    //     this.form.validateAll();
    // }
}

export default Modify;