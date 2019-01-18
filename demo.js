"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = demo;
;"use strict";

// uncomment if you want to use jspm module loading instead of cdn.
// import $ from "jquery";
// import _ from 'lodash';

function demo() {
	$("#output").item({
		station: $('#station').val()
		// This example year validator ignores years which have less than 293 (80%) valid daily values.
		// A more advanced validator might ignore years before 1940, or years with more than 30 days of contiguous missing data.
		// yearValidator: (exceedance, dailyValuesByYear, year, allDailyValuesByYear, allDailyValues) => {
		// 	return _.size(_.filter(dailyValuesByYear, (value) => value.valid)) >= 293
		// },
	});
	$('#station').change(function () {
		$("#output").item('option', 'station', $('#station').val()).item('update');
	});
	$('#threshold').change(function () {
		$("#output").item({ threshold: parseFloat($('#threshold').val()) }).item('update');
	});

	// when #variable changes, update ui units and apply sensible defaults.
	$('#variable').change(function () {
		var queryElements = void 0,
		    missingValueTreatment = void 0,
		    windowFunction = void 0;
		switch ($('#variable').val()) {
			case 'precipitation':
				$('#thresholdUnits').text('in');
				$('#threshold').val(1.0);
				break;
			case 'tmax':
				$('#thresholdUnits').text('F');
				$('#threshold').val(95);
				break;
			case 'tmin':
				$('#thresholdUnits').text('F');
				$('#threshold').val(32);
				break;
			case 'tavg':
				$('#thresholdUnits').text('F');
				$('#threshold').val(70);
				break;
		}
		$("#output").item({ threshold: parseFloat($('#threshold').val()), variable: $('#variable').val() }).item('update');
	});

	$('#percentileThreshold').change(function () {
		var value = $('#percentileThreshold').val();
		if (value === '') {
			return;
		}
		if (value <= 0 || value >= 100) {
			$('#percentileThreshold').addClass('form-control-danger');
			return;
		}
		$('#threshold').val($("#output").item('getPercentileValue', value)).trigger('change');
	});
	$('#95ththreshold').click(function () {
		$('#percentileThreshold').val(95).trigger('change');
	});
	$('#90ththreshold').click(function () {
		$('#percentileThreshold').val(90).trigger('change');
	});
	$('#80ththreshold').click(function () {
		$('#percentileThreshold').val(80).trigger('change');
	});
	$('#download-data').click(function (e) {
		$('#output').item('downloadExceedanceData', e.target);
	});

	$('#window').change(function () {
		$("#output").item({ window: parseInt($('#window').val()) });
		$("#output").item('update');
	});
};

window.demo = demo;
