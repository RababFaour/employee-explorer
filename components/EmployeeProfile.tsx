import { url, id } from "@/components/config";


type Employee ={
    name:string;
    email:string;
    company:{name:string};
};
async function getEmployee():Promise<Employee>{
     const response = await fetch(`${url}/users/${id}`);
        if (!response.ok) {
          throw new Error("Could not load employee");
        }
        return response.json();
    }

export default async function EmployeesProfile() {
    let employee:Employee|null=null;
    try{ 
        employee = await getEmployee();
    
    }catch{
       employee=null;
    }
    if(!employee){
       return(
            <section className="rounded-xl border border-[#b2cbb8] bg-[#d3e5d5] p-5 shadow-lg shadow-green-900/15" style={{ backgroundColor: "#d3e5d5", borderColor: "#b2cbb8", boxShadow: "0 8px 22px rgba(21, 61, 41, 0.14)" }}>
                <h2 className="mb-4 font-heading text-4xl font-bold text-green-800">Employee Profile</h2>
                <p className="rounded bg-red-50 p-3 font-medium text-red-700">Sorry, we could not load the employee profile right now.</p>
            </section>
        );
    }
    
         return( 
         <section className="rounded-xl border border-[#b2cbb8] bg-[#d3e5d5] p-5 shadow-lg shadow-green-900/15" style={{ backgroundColor: "#d3e5d5", borderColor: "#b2cbb8", boxShadow: "0 8px 22px rgba(21, 61, 41, 0.14)" }}>
            <h2  className="mb-4 font-heading text-4xl font-bold text-green-800">Employee Profile</h2>
            <div className="rounded-lg border border-[#cfddcf] bg-[#f7faf7] p-4" style={{ backgroundColor: "#f7faf7", borderColor: "#cfddcf" }}>
            <p><span className="font-semibold">Name:</span>{" "}{employee.name}</p>
            <p><span className="font-semibold">Email:</span>{" "}{employee.email}</p>
            <p><span className="font-semibold">Company:</span>{" "}{employee.company.name}</p>
            </div>
        </section>)
}