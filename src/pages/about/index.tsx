import Link from "next/link";
import Image from "next/image";
import { banner } from "../../../image-config";

const AboutUs = () => {
  return (
    <div className="container py-8">
      <nav className="text-sm mb-6">
        <Link className="text-muted-foreground hover:text-foreground" href="/">
          Home
        </Link>{" "}
        / <span className="text-foreground">About Us</span>
      </nav>

      <h1 className="text-4xl font-bold mb-6">About Us</h1>

      <Image
        src={banner}
        alt="Skorin Deli founders"
        width={800}
        height={400}
        className="w-full h-auto mb-6"
      />

      <div className="space-y-4 mb-8">
        <p>
          The story about the birth of Skorin Deli starts with two brothers and
          their passion – Food.
        </p>

        <p>
          Nothing strange so far given that Carlo and I (Paolo) are Italians and
          it is not that hard to find two Italians who are passionate about
          food.
        </p>

        <p>
          We grew up in a small quite costal town in the central Italian region
          called Le Marche where the gentle breeze of the Adriatic Sea caresses
          luscious and fertile hills before swiping the Apennine Mountains.
        </p>

        <p>
          This particular geographical location has given us access, from an
          early age, to a wide variety of produce both from the sea and the
          land. Naturally all this variety ended up combined in a pot or on a
          baking tray to create innumerable delicious dishes. Starting from our
          treasured{" "}
          <Link href="#" className="text-primary hover:underline">
            Brodetto di Pesce
          </Link>{" "}
          (fish soup – we are biased for the Sambenedettese version), to the
          Fritto Misto all&apos;Ascolana (fried lamb and vegetables) continuing
          to the better known Italian meal staples such as the Bucatini
          all&apos;Amatriciana or a Zuppa di Farro (Spelt Soup).
        </p>

        <p>
          After relocating to this beautiful land Downunder, we became acutely
          conscious about the scarcity of quality Italian produce as well as
          tired of having to spend Saturday mornings taking trips to
          Sydney&apos;s inner-west Italian delis to find some of our favourite
          ingredients.
        </p>

        <p>
          Unashamedly, we created Skorin Deli to have easy access to all these
          foods and beverages we miss and crave from our homeland but don&apos;t
          worry, we are also going to share them with you!
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">This is our Manifesto:</h2>

        <div className="space-y-4">
          <div>
            <h3 className="font-bold">1. Skorin Deli is accessible</h3>
            <p>
              You can reach us online and we will deliver anywhere in Australia.
            </p>
          </div>

          <div>
            <h3 className="font-bold">2. Skorin Deli is contemporary</h3>
            <p>
              We aim to bring products that are currently popular in Italian to
              the Australian market.
            </p>
          </div>

          <div>
            <h3 className="font-bold">3. Skorin Deli is affordable</h3>
            <p>
              We aim to provide quality Italian produce at reasonable prices,
              and we do so by avoiding the set up and maintenance costs of a
              high street brick and mortar shop.
            </p>
          </div>

          <div>
            <h3 className="font-bold">4. Skorin Deli continues to evolve</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
