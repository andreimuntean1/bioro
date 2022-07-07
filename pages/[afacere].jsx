import Head from "next/head";
import Image from "next/image";
import Header from "components/Header";
import { collection, doc, getDoc, getDocs, getFirestore } from "firebase/firestore";
import { app } from "database";
import { useAuth } from "hooks/useAuth";

const Afacere = ({data}) => {  
  const {pending, isSignedIn} = useAuth();

  return (
    <>
      <Head>
        <title>BioRO - {data.name}</title>
      </Head> 
      <div className="font-nunito min-w-full min-h-screen bg-background text-white flex flex-col xl:items-center md:max-w-full xl:max-w-3xl">
				<Header isLoggedIn={isSignedIn} />
        {/* <Image src={urlFor(data.cover_image).url()} alt={`Imagine de copertă pentru ${}`} className="w-full" /> */}
        <div className="p-8">
          <div className="mb-5">
            <h1 className="font-montserrat text-4xl md:text-5xl md:text-center">{data.name}</h1>
            <p className="text-white text-opacity-60 mt-4 text-lg">{data.location}</p>
            <ul className="ml-5 mt-5 text-white text-opacity-80 list-disc text-lg">
              {data.properties.map((property, index) => <li className="mt-2" key={index}>{property}</li> )}
            </ul>
            <div className="mt-12">
              <h2 className="text-3xl">Cum se fabrică?</h2>
              <p className="mt-5">{}</p>
            </div>
            <div className="mt-12">
              <h2 className="text-3xl">Vezi cu ochii tăi</h2> 
              {
                
              }
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

const db = getFirestore(app);
const col = collection(db, "producatori");

export const getStaticPaths = async () => {
  const snapshot = await getDocs(col);
  const paths = snapshot.docs.map(doc => {
    return {
      params: {
        afacere: doc.id.toString()
      }
    }
  })

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async (ctx) => {
  const id = ctx.params.afacere;
  const docRef = doc(db, "producatori", id);
  const docSnap = await getDoc(docRef);

  return {
    props: {
      data: docSnap.data()
    }
  }
}

export default Afacere;