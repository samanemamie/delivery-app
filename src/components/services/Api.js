import axios from "axios";

export async function getMethod(props) {
    try {
        const response = await axios({
            method: "GET",
            url: `${process.env.hostName}${props.url}`,
            headers: {
                Authorization: `${process.env.authorizationPanel} ${props.token}`,
                "Accept-Language": props.lang,
            },
        });
        if (response.status === 200 && response.data.status === "success") {
            return response.data;
        }
    } catch (err) {
        if (err.response && err.response.data && err.response.data.msg) {
            throw new Error(err.response.data.msg);
        } else {
            throw new Error("Unknown error occurred");
        }
    }
}

export async function PostMethod({ url, body, token }) {
    try {
        const response = await axios({
            method: "POST",
            url: process.env.hostName + url,
            headers: {
                Authorization: `${process.env.AuthorizationPanel} ${token}`,
            },
            data: body,
        });
        if (response.data.status === "success") {
            return response;
        }
    } catch (err) {
        if (err.response && err.response.data && err.response.data.msg) {
            return err.response;
        } else {
            throw new Error("Unknown error occurred");
        }
    }
}

export async function PatchMethod({ url, body, token }) {
    try {
        const response = await axios({
            method: "patch",
            url: process.env.hostName + url,
            headers: {
                Authorization: `${process.env.AuthorizationPanel} ${token}`,
            },
            data: body,
        });
        if (response.data.status === "success") {
            return response;
        }
        return response;
    } catch (err) {
        return err.response || err;
    }
}

export async function PutMethod(props, res, error) {
    axios({
        method: "PUT",
        url: process.env.hostName + props.url,
        headers: {
            Authorization: `${process.env.AuthorizationPanel} ${props.token}`,
        },
        data: props.body,
    })
        .then(function (response) {
            if (response.status === 200 && response.data.status === "success") {
                res(response.data);
            }
            return;
        })
        .catch(function (err) {
            if (err.response) {
                //یزره اذیت کرد گذاشتیم اینو
                return err;
            }
            return;
        });
}

export async function DeleteMethod(props, res, error) {
    axios({
        method: "DELETE",
        url: process.env.hostName + props.url,
        headers: {
            Authorization: `${process.env.AuthorizationPanel} ${props.token}`,
        },
        data: props.body,
    })
        .then(function (response) {
            if (response.status === 200 && response.data.status === "success") {
                res(response.data);
            }
            return;
        })
        .catch(function (err) {
            error(err);
            return;
        });
}

//////// درخواست های غیر مجاز باید رفع شود
