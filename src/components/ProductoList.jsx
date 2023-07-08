import React, { useContext, useState } from "react";
import { Panel } from "primereact/panel";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { ProductoContext } from "../contexts/ProductoContext";
import ProductoForm from "./ProductoForm";

const ProductoList = () => {
  const { productos, findProducto } = useContext(ProductoContext);

  const [isVisible, setIsVisible] = useState(false);

  const saveProducto = (id) => {
    findProducto(id);
    setIsVisible(true);
  };

  const footer = (
    <div className="p-clearfix" style={{ width: "100%" }}>
      <Button
        style={{ float: "left" }}
        icon="pi pi-plus"
        label="Agregar"
        onClick={() => setIsVisible(true)}
      />
    </div>
  );

  return (
    <div>
      <Panel header="LISTA DE PRODUCTOS" style={{ textAlign: "center" }}>
        <DataTable
          value={productos}
          selectionMode="single"
          onSelectionChange={(e) => saveProducto(e.value._id)}
          footer={footer}
        >
          <Column field="_id" header="Id" />
          <Column field="nombre" header="Nombre" />
          <Column field="precio" header="Precio" />
          <Column field="fecha_expiracion" header="Fecha de expiración" />
        </DataTable>
      </Panel>
      <ProductoForm isVisible={isVisible} setIsVisible={setIsVisible} />
    </div>
  );
};

export default ProductoList;
