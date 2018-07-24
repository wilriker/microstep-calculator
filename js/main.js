$(document).ready(function() {
	calcExtrusionData();
	calcUStepsTable();
});

$('#line_width').change(calcExtrusionData);
$('#layer_height').change(calcExtrusionData);
$('#flow').change(calcExtrusionData);
$('#filament_diameter').change(calcExtrusionData);
$('#segment_size').change(calcExtrusionData);

$('#extrusion_on_segment').on('change', calcUStepsTable);
$('#extruder_steps').change(calcUStepsTable);
$('#retraction_speed').change(calcUStepsTable);
$('#step_rate').change(calcUStepsTable);
$('#retraction_speed').change(calcUStepsTable);

function calcUStepsTable() {
	var extruderSteps16    = parseFloat($('#extruder_steps').val()),
		stepRate           = parseInt($('#step_rate').val()) * 1000,
		retractionSpeed    = parseInt($('#retraction_speed').val()),
		extrusionOnSegment = parseFloat($('#extrusion_on_segment').text()),
		segmentSize        = parseFloat($('#segment_size').val()),

		steps              = [1, 2, 4, 8, 16, 32, 64, 128, 256],
		multiplier         = [1/16, 1/8, 1/4, 1/2, 1, 2, 4, 8 ,16];

	for (var i = 0; i < steps.length; i++) {
		var extruderSteps   = (extruderSteps16 * multiplier[i])
			mmUstep         = (1 / extruderSteps),
			maxRetract      = (stepRate / extruderSteps) * 60,
			uStepsOnSegment = (extrusionOnSegment / mmUstep);

		$('#steps_mm_' + steps[i]).text(extruderSteps.toFixed(3));

		$('#mm_ustep_' + steps[i]).text(mmUstep.toFixed(5));

		$('#max_retract_' + steps[i])
			.text(maxRetract.toFixed(1))
			.addClass(maxRetract >= retractionSpeed ? 'text-success' : 'text-danger')
			.removeClass(maxRetract < retractionSpeed ? 'text-success' : 'text-danger');

		$('#usteps_on_segment_' + steps[i])
			.text(uStepsOnSegment.toFixed(5))
			.addClass(uStepsOnSegment >= 1 ? 'text-success' : 'text-danger')
			.removeClass(uStepsOnSegment < 1 ? 'text-success' : 'text-danger');
	}
}

function calcExtrusionData() {

	// Extrusion in mm³/mm
	var lineWidth = parseFloat($('#line_width').val());
	var layerHeight = parseFloat($('#layer_height').val());
	var flowRate = parseFloat($('#flow').val()) / 100.0;

	var extrusionInMM3PerMM = lineWidth * layerHeight * flowRate;

	$('#extrusion_in_mm3_mm').text(extrusionInMM3PerMM.toFixed(5));

	// Filament cross-sectional area
	var filamentDiameter = parseFloat($('#filament_diameter').val());
	var filamentRadius = filamentDiameter / 2;
	var filamentArea = (filamentRadius * filamentRadius) * Math.PI;

	$('#filament_area').text(filamentArea.toFixed(5));

	// Input-Output-Ratio
	var inputOutputRatio = extrusionInMM3PerMM / filamentArea;

	$('#input_output_ratio').text(inputOutputRatio.toFixed(5));

	// Extrusion on segement
	var segmentSize = parseFloat($('#segment_size').val());
	var extrusionOnSegment = segmentSize * inputOutputRatio;

	$('#extrusion_on_segment')
		.text(extrusionOnSegment.toFixed(5))
		.trigger('change');
}

