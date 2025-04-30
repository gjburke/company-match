interface CompanyProps {
    name: string;
}

export default function Company({ name }: CompanyProps) {
    return <li>{name}</li>;
}