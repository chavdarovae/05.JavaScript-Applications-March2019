let contacts=[{Person: 'Emi', Phone: '+35922322322'},
{Person: 'Niki', Phone: '+35900300300'},
{Person: 'Slavi', Phone: '+35911311311'}]
Object.entries(contacts).forEach(c=>{
    console.log(c);
    console.log(c[0]);
    console.log(c[1].Person);
    console.log(c[1].Phone);
})