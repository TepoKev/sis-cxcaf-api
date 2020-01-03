
function capture(model, body) {
    const empProps = Object.keys(model);
    var data = {};
    empProps.forEach((valor, clave) => {
        if (body[valor] !== undefined) {
            data[valor] = body[valor];
        }
    });
    return data;
}

export { capture }