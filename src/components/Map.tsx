const Map = () => {
  return (
    <div className="map-container w-full aspect-video rounded-xl shadow-lg overflow-hidden">
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.4085682177647!2d77.51544837507824!3d13.073272887251509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae23546c4dd315%3A0x8271280ac6396980!2sSihi%20Kshanagalu%20event%20planners!5e0!3m2!1sen!2sin!4v1737743295424!5m2!1sen!2sin"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="hover:opacity-95 transition-opacity duration-300"
      />
    </div>
  );
};

export default Map; 