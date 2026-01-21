const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impja2toZnFzd2lhc25lcHNoeGJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyNDQ0NDIsImV4cCI6MjA2NDgyMDQ0Mn0.3-uOf61O93hSmhP3UvjBRZuAf5vEg6xyUYu77VyVMZ8';

const playerMapping = {
  'Florin Claudiu Salceanu': '1%20Florin%20Salceanu.png',
  'Omar Sinclair': '2%20Omar%20Sinclair.png',
  'Sam Walker': '4%20Sam%20Walker.png',
  'Michael Olatunji': '5%20Michael%20Olatunji.png',
  'Kayode Adewale': '6%20Kayode%20Adewale.png',
  'Zak Bell': '8%20Zacharias%20Bell.png',
  'Sam Pratt': '9%20Sam%20Pratt.png',
  'Joao De Andrade': '11%20Joao%20de%20Andrade.png',
  'Dion Kemp': '14%20Dion%20Kemp.png',
  'Ronaldo Brown': '17%20Ronaldo%20Brown.png',
  'Josh Mbala': '19%20Josh%20Mbala.png',
  'Alexander Black': '22%20Alexander%20Black.png',
  'Joseph Coleman': '24%20Joseph%20Coleman.png',
  'Mike Taylor': '29%20Michael%20Taylor.png',
  'Ellis Pacer': '30%20Ellis%20Pacer.png',
  'Ryan Liddle': '33%20Ryan%20Liddle.png'
};

(async () => {
  try {
    const response = await fetch('https://jckkhfqswiasnepshxbr.supabase.co/rest/v1/spfc_players?select=id,name', {
      headers: {
        'apikey': apiKey,
        'Authorization': `Bearer ${apiKey}`,
      }
    });

    const players = await response.json();
    console.log(`Found ${players.length} players`);

    let updated = 0;
    for (const player of players) {
      const filename = playerMapping[player.name];
      if (filename) {
        const imageUrl = `https://kujsvwpklxrmxbqsqrtu.supabase.co/storage/v1/object/public/spfc_player_images/${filename}`;
        
        const updateResponse = await fetch(`https://jckkhfqswiasnepshxbr.supabase.co/rest/v1/spfc_players?id=eq.${player.id}`, {
          method: 'PATCH',
          headers: {
            'apikey': apiKey,
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ image_url: imageUrl })
        });

        if (updateResponse.ok) {
          console.log(`✓ Updated ${player.name}`);
          updated++;
        } else {
          console.log(`✗ Failed to update ${player.name}`);
        }
      }
    }
    console.log(`\n✓✓✓ Updated ${updated} player image URLs!`);
  } catch (error) {
    console.error('Error:', error.message);
  }
})();
