// < Functions >
async function get_csrf()
{
    try
    {
        const meta_tag = document.querySelector('meta[name="csrf-token"]');
        //
        if (meta_tag)
        {
            const data_token = meta_tag.getAttribute('data-token');
            //
            if (data_token)
            {
                return data_token;
            };
        };
        //
        return null;
    }
    catch (eggsception)
    {
        console.error('error while retrieving csrf', eggsception);
        //
        return null;
    };
};
//
async function remove_item(asset_id, csrf_token)
{
    try
    {
        const response = await fetch(`https://inventory.roblox.com/v2/inventory/asset/${asset_id}`,
        {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Accept-Language': 'en-US,en;q=0.5',
                'x-csrf-token': csrf_token
            }
        });
        //
        console.log('response status', response.status);
        console.log('response text', await response.text());
        //
        if (response.ok)
        {
            console.log('removed item');
        }
        else
        {
            console.error('error while removing item');
        };
    }
    catch (eggsception)
    {
        console.error('error while removing item', eggsception);
    };
};
//
async function handler()
{
    try
    {
        const asset_id = window.location.pathname.split('/')[2];
        //
        if (!asset_id || !/^\d+$/.test(asset_id))
        {
            console.error('error invalid page');
            //
            return;
        };
        //
        const csrf_token = await get_csrf();
        //
        if (csrf_token)
        {
            await remove_item(asset_id, csrf_token);
        }
        else
        {
            console.error('error invalid csrf token');
        };
    }
    catch (eggsception)
    {
        console.error('error while executing main', eggsception);
    };
};
// < Main >
handler();
// < End >
