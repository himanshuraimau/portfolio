const MDXComponents = {
  h1: (props: any) => <h1 className="text-3xl font-bold my-4" {...props} />,
  h2: (props: any) => <h2 className="text-2xl font-semibold my-3" {...props} />,
  p: (props: any) => <p className="my-2" {...props} />,
  // Add more custom components as needed
}

export default MDXComponents