
import React, { useState } from "react";
import Card from "../../components/common/Card"
import TextField from "../../components/common/TextField"
import Button from "../../components/common/Button"
import Select from "../../components/common/Select"
import { createUserAction } from "../../clients/client"
import { useNavigate } from "react-router-dom"
import { URLS } from "../../routes"
import Checkbox from "../../components/common/Checkbox";
import {useSelector} from "react-redux";
import { getUserSelector } from "../../redux/selectors";


export const BANK_POSITIONS = {
  ADMIN_GL: "ROLE_GL_ADMIN",
  ADMIN: "ROLE_ADMIN",
  ROLE_AGENT: "ROLE_AGENT",
  ROLE_SUPERVISOR: "ROLE_SUPERVISOR",
};

export default function NewUserPage() {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        ime: "",
        prezime: "",
        email: "",
        jmbg: "",
        brTelefon: "",
        pozicija: BANK_POSITIONS.ADMIN,
        limit: "",
        needsSupervisorPermission: false,
    })

  function handleChange(e) {
    setForm({ ...form, ...e });
  }

  async function handleSubmit() {
    try {
      await createUserAction(form);
      navigate("/" + URLS.DASHBOARD.LIST.INDEX);
    } catch (e) {}
  }

    const user = useSelector(getUserSelector);

    return (
        <div>
            <div className="w-[500px]">
                <Card title="Register new user">
                    <div className="flex flex-col gap-3">
                        <TextField placeholder="Ime" onChange={(e) => handleChange({ ime: e })} />
                        <TextField placeholder="Prezime" onChange={(e) => handleChange({ prezime: e })} />
                        <TextField placeholder="E-mail" onChange={(e) => handleChange({ email: e })} />
                        <TextField placeholder="JMBG" onChange={(e) => handleChange({ jmbg: e })} />
                        <TextField placeholder="Broj telefona" onChange={(e) => handleChange({ brTelefon: e })} />
                        {user && (user["role"]["name"] == "ROLE_ADMIN" || user["role"]["name"] == "ROLE_GL_ADMIN" || user["role"]["name"] == "ROLE_SUPERVISOR") && <TextField placeholder="Limit" onChange={(e) => handleChange({limit: e})}/>}
                        <Select options={[
                            BANK_POSITIONS.ADMIN,
                            BANK_POSITIONS.ADMIN_GL,
                            BANK_POSITIONS.ROLE_AGENT,
                            BANK_POSITIONS.ROLE_SUPERVISOR,]} onChange={(e) => handleChange({ pozicija: e })} />
                        {user && (user["role"]["name"] == "ROLE_ADMIN" || user["role"]["name"] == "ROLE_GL_ADMIN" || user["role"]["name"] == "ROLE_SUPERVISOR") && <Checkbox
                            label="Zahtevati odobravanje svake porudžbine"
                            onChange={(e) => handleChange({needsSupervisorPermission: e})}
                            value={form["Zahtevati odobravanje svake porudžbine"]}
                        />}
                        <Button label="Register" type="submit" onClick={handleSubmit} />
                    </div>
                </Card>
            </div>
        </div>
    )

}
