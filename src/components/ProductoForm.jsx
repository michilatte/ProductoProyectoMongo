import React, { useContext, useState, useEffect } from "react";
import { ProductoContext } from "../contexts/ProductoContext";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";

const ProductoForm = (props) => {
  const { isVisible, setIsVisible } = props;

  const {
    createProducto,
    deleteProducto,
    editProducto,
    updateProducto,
  } = useContext(ProductoContext);

  const initialProductoState = {
    _id: null,
    nombre: "",
    precio: 0,
    fecha_expiracion: null,
  };

  const [productoData, setProductoData] = useState(initialProductoState);

  useEffect(() => {
    if (editProducto) setProductoData(editProducto);
  }, [editProducto]);

  const updateField = (data, field) => {
    setProductoData({
      ...productoData,
      [field]: data,
    });

    console.log(productoData);
  };

  const _deleteProducto = () => {
    if (editProducto) {
      deleteProducto(productoData._id);
      setProductoData(initialProductoState);
    }
    setIsVisible(false);
  };

  const saveProducto = () => {
    if (!editProducto) {
      createProducto(productoData);
    } else {
      updateProducto(productoData);
    }
    setProductoData(initialProductoState);
    setIsVisible(false);
  };

  const dialogFooter = (
    <div className="ui-dialog-buttonpane p-clearfix">
      <Button label="Eliminar" icon="pi pi-times" onClick={_deleteProducto} />
      <Button label="Guardar" icon="pi pi-check" onClick={saveProducto} />
    </div>
  );

  const clearSelected = () => {
    setIsVisible(false);
    setProductoData(initialProductoState);
  };

  return (
    <div>
      <Dialog
        visible={isVisible}
        modal={true}
        style={{ width: "420px" }}
        contentStyle={{ overflow: "visible" }}
        header="Nuevo Producto"
        onHide={() => clearSelected()}
        footer={dialogFooter}
      >
        <div className="p-grid p-fluid">
          <br />
          <div className="p-float-label">
            <InputText
              value={productoData.name}
              onChange={(e) => updateField(e.target.value.trim(), "nombre")}
            />
            <label>Nombre:</label>
          </div>
          <br />
          <div className="p-float-label">
            <InputNumber
              value={productoData.precio}
              onValueChange={(e) => updateField(e.target.value, "precio")}
              mode="currency"
              currency="USD"
              locale="en-US"
            />
            <label>Precio:</label>
          </div>
          <br />
          <div className="p-float-label">
            <Calendar
              value={
                productoData.expiry_date &&
                new Date(productoData.expiry_date + " ")
              }
              onChange={(e) =>
                updateField(
                  e.target.value.toISOString().substring(0, 10),
                  "fecha_expiracion"
                )
              }
              dateFormat="yy-mm-dd"
            />
            <label>Fecha de expiración:</label>
          </div>
          <br />
        </div>
      </Dialog>
    </div>
  );
};

export default ProductoForm;
