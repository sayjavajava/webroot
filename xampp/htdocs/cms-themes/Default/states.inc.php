<?php

	$states = array(
		array('id'=>'AK', 'text'=>'AK'),
		array('id'=>'AL', 'text'=>'AL'),
		array('id'=>'AR', 'text'=>'AR'),
		array('id'=>'AZ', 'text'=>'AZ'),
		array('id'=>'CA', 'text'=>'CA'),
		array('id'=>'CO', 'text'=>'CO'),
		array('id'=>'CT', 'text'=>'CT'),
		array('id'=>'DC', 'text'=>'DC'),
		array('id'=>'DE', 'text'=>'DE'),
		array('id'=>'FL', 'text'=>'FL'),
		array('id'=>'GA', 'text'=>'GA'),
		array('id'=>'HI', 'text'=>'HI'),
		array('id'=>'IA', 'text'=>'IA'),
		array('id'=>'ID', 'text'=>'ID'),
		array('id'=>'IL', 'text'=>'IL'),
		array('id'=>'IN', 'text'=>'IN'),
		array('id'=>'KS', 'text'=>'KS'),
		array('id'=>'KY', 'text'=>'KY'),
		array('id'=>'LA', 'text'=>'LA'),
		array('id'=>'MA', 'text'=>'MA'),
		array('id'=>'MD', 'text'=>'MD'),
		array('id'=>'ME', 'text'=>'ME'),
		array('id'=>'MI', 'text'=>'MI'),
		array('id'=>'MN', 'text'=>'MN'),
		array('id'=>'MO', 'text'=>'MO'),
		array('id'=>'MS', 'text'=>'MS'),
		array('id'=>'MT', 'text'=>'MT'),
		array('id'=>'NC', 'text'=>'NC'),
		array('id'=>'ND', 'text'=>'ND'),
		array('id'=>'NE', 'text'=>'NE'),
		array('id'=>'NH', 'text'=>'NH'),
		array('id'=>'NJ', 'text'=>'NJ'),
		array('id'=>'NM', 'text'=>'NM'),
		array('id'=>'NV', 'text'=>'NV'),
		array('id'=>'NY', 'text'=>'NY'),
		array('id'=>'OH', 'text'=>'OH'),
		array('id'=>'OK', 'text'=>'OK'),
		array('id'=>'OR', 'text'=>'OR'),
		array('id'=>'PA', 'text'=>'PA'),
		array('id'=>'PR', 'text'=>'PR'),
		array('id'=>'RI', 'text'=>'RI'),
		array('id'=>'SC', 'text'=>'SC'),
		array('id'=>'SD', 'text'=>'SD'),
		array('id'=>'TN', 'text'=>'TN'),
		array('id'=>'TX', 'text'=>'TX'),
		array('id'=>'UT', 'text'=>'UT'),
		array('id'=>'VA', 'text'=>'VA'),
		array('id'=>'VI', 'text'=>'VI'),
		array('id'=>'VT', 'text'=>'VT'),
		array('id'=>'WA', 'text'=>'WA'),
		array('id'=>'WI', 'text'=>'WI'),
		array('id'=>'WV', 'text'=>'WV'),
		array('id'=>'WY', 'text'=>'WY')
	);

	echo lum_buildSelectOptions($states, 'id', 'text', (isset($_POST[$select_option]) ? $_POST[$select_option] : ''));

?>